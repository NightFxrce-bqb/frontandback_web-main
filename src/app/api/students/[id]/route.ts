import { deleteStudentDb, updateStudentDb } from '@/db/studentDb';
import type StudentInterface from '@/types/StudentInterface';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Params): Promise<Response> {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Неверный ID студента' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const body = await request.json();
    const { firstName, lastName, middleName, groupId } = body as {
      firstName: string;
      lastName: string;
      middleName: string;
      groupId?: number;
    };

    if (!firstName || !lastName || !middleName) {
      return new Response(JSON.stringify({ error: 'Все поля ФИО обязательны' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const student = await updateStudentDb(id, firstName, lastName, middleName, groupId);

    return new Response(JSON.stringify(student), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Ошибка обновления студента:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function DELETE(request: Request, { params }: Params): Promise<Response> {  
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Неверный ID студента' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const deletedStudentId = await deleteStudentDb(id);

    return new Response(JSON.stringify({ deletedStudentId }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Ошибка удаления студента:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
