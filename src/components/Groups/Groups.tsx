'use client';

import { useState } from 'react';
import useGroups from '@/hooks/useGroups';
import { createGroupApi, updateGroupApi, deleteGroupApi } from '@/api/groupsApi';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Groups.module.scss';

const Groups = (): React.ReactElement => {
  const { groups, refetch } = useGroups();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [editGroupName, setEditGroupName] = useState('');

  const handleCreateGroup = async (): Promise<void> => {
    if (!newGroupName.trim()) return;

    const group = await createGroupApi(newGroupName.trim());
    if (group) {
      setNewGroupName('');
      setIsCreating(false);
      refetch();
    }
  };

  const handleUpdateGroup = async (id: number): Promise<void> => {
    if (!editGroupName.trim()) return;

    const group = await updateGroupApi(id, editGroupName.trim());
    if (group) {
      setEditingId(null);
      setEditGroupName('');
      refetch();
    }
  };

  const handleDeleteGroup = async (id: number): Promise<void> => {
    if (confirm('Вы уверены, что хотите удалить эту группу?')) {
      const success = await deleteGroupApi(id);
      if (success) {
        refetch();
      }
    }
  };

  const startEdit = (group: GroupInterface): void => {
    setEditingId(group.id);
    setEditGroupName(group.name);
  };

  const cancelEdit = (): void => {
    setEditingId(null);
    setEditGroupName('');
  };

  return (
    <div className={styles.Groups}>
      <div className={styles.header}>
        <h2>Группы</h2>
        <button 
          className={styles.addButton}
          onClick={() => setIsCreating(true)}
        >
          Добавить группу
        </button>
      </div>

      {isCreating && (
        <div className={styles.createForm}>
          <input
            type="text"
            placeholder="Название группы"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className={styles.input}
          />
          <div className={styles.buttonGroup}>
            <button onClick={handleCreateGroup} className={styles.saveButton}>
              Сохранить
            </button>
            <button 
              onClick={() => {
                setIsCreating(false);
                setNewGroupName('');
              }} 
              className={styles.cancelButton}
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className={styles.groupsList}>
        {groups.map((group: GroupInterface) => (
          <div key={group.id} className={styles.groupCard}>
            {editingId === group.id ? (
              <div className={styles.editForm}>
                <input
                  type="text"
                  value={editGroupName}
                  onChange={(e) => setEditGroupName(e.target.value)}
                  className={styles.input}
                />
                <div className={styles.buttonGroup}>
                  <button 
                    onClick={() => handleUpdateGroup(group.id)} 
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
              <div className={styles.groupContent}>
                <h3 className={styles.groupName}>{group.name}</h3>
                <div className={styles.actions}>
                  <button 
                    onClick={() => startEdit(group)}
                    className={styles.editButton}
                  >
                    Редактировать
                  </button>
                  <button 
                    onClick={() => handleDeleteGroup(group.id)}
                    className={styles.deleteButton}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
