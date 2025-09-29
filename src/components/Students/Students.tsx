'use client';

import { useState } from 'react';
import useStudents from '@/hooks/useStudents';
import useGroups from '@/hooks/useGroups';
import { createStudentApi, updateStudentApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';
import type GroupInterface from '@/types/GroupInterface';
import { deleteStudentApi } from '@/api/studentsApi';
import Student from '@/components/Students/Student/Student';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students, refetch: refetchStudents } = useStudents();
  const { groups } = useGroups();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    groupId: undefined as number | undefined
  });
  const [editStudent, setEditStudent] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    groupId: undefined as number | undefined
  });

  const onDeleteHandler = async (id: number): Promise<void> => {
    const ok = await deleteStudentApi(id);
    if (ok) {
      refetchStudents();
    }
  };

  const handleCreateStudent = async (): Promise<void> => {
    if (!newStudent.firstName.trim() || !newStudent.lastName.trim() || !newStudent.middleName.trim()) {
      return;
    }

    const student = await createStudentApi(
      newStudent.firstName.trim(),
      newStudent.lastName.trim(),
      newStudent.middleName.trim(),
      newStudent.groupId
    );

    if (student) {
      setNewStudent({ firstName: '', lastName: '', middleName: '', groupId: undefined });
      setIsCreating(false);
      refetchStudents();
    }
  };

  const handleUpdateStudent = async (id: number): Promise<void> => {
    if (!editStudent.firstName.trim() || !editStudent.lastName.trim() || !editStudent.middleName.trim()) {
      return;
    }

    const student = await updateStudentApi(
      id,
      editStudent.firstName.trim(),
      editStudent.lastName.trim(),
      editStudent.middleName.trim(),
      editStudent.groupId
    );

    if (student) {
      setEditingId(null);
      setEditStudent({ firstName: '', lastName: '', middleName: '', groupId: undefined });
      refetchStudents();
    }
  };

  const startEdit = (student: StudentInterface): void => {
    setEditingId(student.id);
    setEditStudent({
      firstName: student.firstName,
      lastName: student.lastName,
      middleName: student.middleName,
      groupId: student.groupId
    });
  };

  const cancelEdit = (): void => {
    setEditingId(null);
    setEditStudent({ firstName: '', lastName: '', middleName: '', groupId: undefined });
  };

  const getGroupName = (groupId?: number): string => {
    if (!groupId) return 'Без группы';
    const group = groups.find(g => g.id === groupId);
    return group ? group.name : 'Неизвестная группа';
  };

  return (
    <div className={styles.Students}>
      <div className={styles.header}>
        <h2>Студенты</h2>
        <button 
          className={styles.addButton}
          onClick={() => setIsCreating(true)}
        >
          Добавить студента
        </button>
      </div>

      {isCreating && (
        <div className={styles.createForm}>
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Фамилия"
              value={newStudent.lastName}
              onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Имя"
              value={newStudent.firstName}
              onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Отчество"
              value={newStudent.middleName}
              onChange={(e) => setNewStudent({ ...newStudent, middleName: e.target.value })}
              className={styles.input}
            />
          </div>
          <div className={styles.formRow}>
            <select
              value={newStudent.groupId || ''}
              onChange={(e) => setNewStudent({ ...newStudent, groupId: e.target.value ? parseInt(e.target.value) : undefined })}
              className={styles.select}
            >
              <option value="">Выберите группу</option>
              {groups.map((group: GroupInterface) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.buttonGroup}>
            <button onClick={handleCreateStudent} className={styles.saveButton}>
              Сохранить
            </button>
            <button 
              onClick={() => {
                setIsCreating(false);
                setNewStudent({ firstName: '', lastName: '', middleName: '', groupId: undefined });
              }} 
              className={styles.cancelButton}
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className={styles.studentsList}>
        {students.map((student: StudentInterface) => (
          <div key={student.id} className={styles.studentCard}>
            {editingId === student.id ? (
              <div className={styles.editForm}>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    placeholder="Фамилия"
                    value={editStudent.lastName}
                    onChange={(e) => setEditStudent({ ...editStudent, lastName: e.target.value })}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Имя"
                    value={editStudent.firstName}
                    onChange={(e) => setEditStudent({ ...editStudent, firstName: e.target.value })}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Отчество"
                    value={editStudent.middleName}
                    onChange={(e) => setEditStudent({ ...editStudent, middleName: e.target.value })}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formRow}>
                  <select
                    value={editStudent.groupId || ''}
                    onChange={(e) => setEditStudent({ ...editStudent, groupId: e.target.value ? parseInt(e.target.value) : undefined })}
                    className={styles.select}
                  >
                    <option value="">Выберите группу</option>
                    {groups.map((group: GroupInterface) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.buttonGroup}>
                  <button 
                    onClick={() => handleUpdateStudent(student.id)} 
                    className={styles.saveButton}
                  >
                    Сохранить
                  </button>
                  <button 
                    onClick={cancelEdit} 
                    className={styles.cancelButton}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.studentContent}>
                <div className={styles.studentInfo}>
                  <Student student={student} onDelete={onDeleteHandler} />
                  <div className={styles.groupInfo}>
                    Группа: {getGroupName(student.groupId)}
                  </div>
                </div>
                <button 
                  onClick={() => startEdit(student)}
                  className={styles.editButton}
                >
                  Редактировать
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;




