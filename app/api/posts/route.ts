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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const published = url.searchParams.get("published");
  const authorId = url.searchParams.get("authorId");
  const tagId = url.searchParams.get("tagId");
  const parsedTagId = tagId === null ? null : Number(tagId);

  if (tagId !== null && !Number.isInteger(parsedTagId)) {
    return jsonError("tagId invalide", 400);
  }

  const posts = await prisma.post.findMany({
    where: {
      ...(published === null ? {} : { published: published === "true" }),
      ...(authorId ? { authorId } : {}),
      ...(parsedTagId === null ? {} : { tags: { some: { id: parsedTagId } } }),
    },
    orderBy: { createAt: "desc" },
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

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    const title = getRequiredString(body.title, "title");
    const slug = getRequiredString(body.slug, "slug");
    const description = getRequiredString(body.description, "description");
    const content = getRequiredString(body.content, "content");
    const imageUrl = getOptionalString(body.imageUrl);
    const published = getOptionalBoolean(body.published) ?? false;
    const authorId = getRequiredString(body.authorId, "authorId");
    const tagIds = getOptionalNumberArray(body.tagIds) ?? [];

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        description,
        imageUrl,
        content,
        published,
        authorId,
        tags: tagIds.length > 0 ? { connect: tagIds.map((id) => ({ id })) } : undefined,
      },
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

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}
