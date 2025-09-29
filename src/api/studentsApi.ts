import type StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getStudentsApi error:', err);
    return [] as StudentInterface[];
  }
};

export const createStudentApi = async (
  firstName: string,
  lastName: string,
  middleName: string,
  groupId?: number
): Promise<StudentInterface | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, middleName, groupId }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const student = await response.json() as StudentInterface;
    return student;
  }
  catch (err) {
    console.log('>>> createStudentApi', err);
    return null;
  }
};

export const updateStudentApi = async (
  id: number,
  firstName: string,
  lastName: string,
  middleName: string,
  groupId?: number
): Promise<StudentInterface | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, middleName, groupId }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const student = await response.json() as StudentInterface;
    return student;
  }
  catch (err) {
    console.log('>>> updateStudentApi', err);
    return null;
  }
};

export const deleteStudentApi = async (studentId: number): Promise<number> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${studentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    return studentId;
  }
  catch (err) {
    console.log('>>> deleteStudentApi', err);
    return -1;
  }
};
