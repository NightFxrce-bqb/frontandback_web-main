import { getGroupsDb, createGroupDb } from '@/db/groupDb';
import type GroupInterface from '@/types/GroupInterface';

export async function GET(): Promise<Response> {
  const groups = await getGroupsDb();

  return new Response(JSON.stringify(groups), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { name } = body as { name: string };

    if (!name || typeof name !== 'string') {
      return new Response(JSON.stringify({ error: 'Название группы обязательно' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const group = await createGroupDb(name);

    return new Response(JSON.stringify(group), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Ошибка создания группы:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
