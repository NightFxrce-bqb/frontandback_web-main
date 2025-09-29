import { updateGroupDb, deleteGroupDb } from '@/db/groupDb';
import type GroupInterface from '@/types/GroupInterface';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Неверный ID группы' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

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

    const group = await updateGroupDb(id, name);

    return new Response(JSON.stringify(group), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Ошибка обновления группы:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Неверный ID группы' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    await deleteGroupDb(id);

    return new Response(JSON.stringify({ id }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Ошибка удаления группы:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
