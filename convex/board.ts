import { v } from "convex/values"
import { mutation } from "./_generated/server";
import { title } from "process";


const images = [
    "/placeholders/Image1.svg",
    "/placeholders/Image2.svg",
    "/placeholders/Image3.svg",
    "/placeholders/Image4.svg",
    "/placeholders/Image5.svg",
    "/placeholders/Image6.svg",
    "/placeholders/Image7.svg",
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const board = await ctx.db.insert("boards", {
            orgId: args.orgId,
            title: args.title,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        });
        return board;
    }
})

export const remove = mutation({
    args: {
        id: v.id("boards"),},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
        const board = await ctx.db.get( args.id);
        if (!board) {
            throw new Error("Board not found");
        }
        if (board.authorId !== identity.subject) {
            throw new Error("Unauthorized");
        }
        await ctx.db.delete( args.id);
    }
})

export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const title = args.title.trim();
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
        if(!title) {
            throw new Error("Title cannot be empty");
        }
        if(title.length > 20) {
            throw new Error("Title must be less than 20 characters");
        }
        const board = await ctx.db.get( args.id);
        if (!board) {
            throw new Error("Board not found");
        }
        if (board.authorId !== identity.subject) {
            throw new Error("Unauthorized");
        }
        const toUpdate = await ctx.db.patch( args.id, { title: args.title });
        return toUpdate;
       
    }
})