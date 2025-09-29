import { getStudentsDb, createStudentDb } from '@/db/studentDb';
import type StudentInterface from '@/types/StudentInterface';

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
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

    const student = await createStudentDb(firstName, lastName, middleName, groupId);

    return new Response(JSON.stringify(student), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Ошибка создания студента:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}




