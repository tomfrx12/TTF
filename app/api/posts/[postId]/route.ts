import { NextResponse } from "next/server";
import {
  getOptionalBoolean,
  getOptionalNumberArray,
  getOptionalString,
  getRequiredString,
  jsonError,
  parseJsonBody,
} from "@/lib/api";
import { prisma } from "@/lib/prisma";

async function getPostId(params: Promise<{ postId: string }> | { postId: string }) {
  const resolvedParams = await Promise.resolve(params);
  const postId = Number(resolvedParams.postId);

  if (!Number.isInteger(postId)) {
    throw new Error("Identifiant de post invalide");
  }

  return postId;
}

export async function GET(_request: Request, context: { params: Promise<{ postId: string }> | { postId: string } }) {
  try {
    const postId = await getPostId(context.params);
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstname: true,
            name: true,
            roleId: true,
            createAt: true,
          },
        },
        tags: true,
      },
    });

    if (!post) {
      return jsonError("Ressource introuvable", 404);
    }

    return NextResponse.json(post);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ postId: string }> | { postId: string } }) {
  try {
    const postId = await getPostId(context.params);
    const body = await parseJsonBody(request);
    const data: {
      title?: string;
      slug?: string;
      description?: string;
      imageUrl?: string | null;
      content?: string;
      published?: boolean;
      authorId?: string;
      tags?: {
        set: Array<{ id: number }>;
        connect: Array<{ id: number }>;
      };
    } = {};

    if (body.title !== undefined) {
      data.title = getRequiredString(body.title, "title");
    }

    if (body.slug !== undefined) {
      data.slug = getRequiredString(body.slug, "slug");
    }

    if (body.description !== undefined) {
      data.description = getRequiredString(body.description, "description");
    }

    if (body.imageUrl !== undefined) {
      data.imageUrl = body.imageUrl === null ? null : getOptionalString(body.imageUrl);
    }

    if (body.content !== undefined) {
      data.content = getRequiredString(body.content, "content");
    }

    const published = getOptionalBoolean(body.published);
    if (published !== undefined) {
      data.published = published;
    }

    if (body.authorId !== undefined) {
      data.authorId = getRequiredString(body.authorId, "authorId");
    }

    const tagIds = getOptionalNumberArray(body.tagIds);
    if (tagIds !== undefined) {
      data.tags = {
        set: [],
        connect: tagIds.map((id) => ({ id })),
      };
    }

    const post = await prisma.post.update({
      where: { id: postId },
      data,
      include: {
        author: true,
        tags: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ postId: string }> | { postId: string } }) {
  try {
    const postId = await getPostId(context.params);

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ deleted: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}
