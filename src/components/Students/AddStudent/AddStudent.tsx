'use client';

import { useForm } from 'react-hook-form';
import type GroupInterface from '@/types/GroupInterface';
import styles from './AddStudent.module.scss';

interface AddStudentFormData {
  firstName: string;
  lastName: string;
  middleName: string;
  groupId?: number;
}

interface AddStudentProps {
  groups: GroupInterface[];
  onSubmit: (data: AddStudentFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const AddStudent = ({ groups, onSubmit, onCancel, isLoading = false }: AddStudentProps): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddStudentFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      groupId: undefined
    }
  });

  const handleFormSubmit = (data: AddStudentFormData): void => {
    onSubmit(data);
    reset();
  };

  const handleCancel = (): void => {
    reset();
    onCancel();
  };

  return (
    <div className={styles.addStudent}>
      <h3>Добавить студента</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="lastName" className={styles.label}>
              Фамилия *
            </label>
            <input
              id="lastName"
              type="text"
              {...register('lastName', {
                required: 'Фамилия обязательна',
                minLength: {
                  value: 2,
                  message: 'Фамилия должна содержать минимум 2 символа'
                },
                maxLength: {
                  value: 50,
                  message: 'Фамилия не должна превышать 50 символов'
                }
              })}
              className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
              placeholder="Введите фамилию"
            />
            {errors.lastName && (
              <span className={styles.errorMessage}>{errors.lastName.message}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="firstName" className={styles.label}>
              Имя *
            </label>
            <input
              id="firstName"
              type="text"
              {...register('firstName', {
                required: 'Имя обязательно',
                minLength: {
                  value: 2,
                  message: 'Имя должно содержать минимум 2 символа'
                },
                maxLength: {
                  value: 50,
                  message: 'Имя не должно превышать 50 символов'
                }
              })}
              className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
              placeholder="Введите имя"
            />
            {errors.firstName && (
              <span className={styles.errorMessage}>{errors.firstName.message}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="middleName" className={styles.label}>
              Отчество *
            </label>
            <input
              id="middleName"
              type="text"
              {...register('middleName', {
                required: 'Отчество обязательно',
                minLength: {
                  value: 2,
                  message: 'Отчество должно содержать минимум 2 символа'
                },
                maxLength: {
                  value: 50,
                  message: 'Отчество не должно превышать 50 символов'
                }
              })}
              className={`${styles.input} ${errors.middleName ? styles.inputError : ''}`}
              placeholder="Введите отчество"
            />
            {errors.middleName && (
              <span className={styles.errorMessage}>{errors.middleName.message}</span>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="groupId" className={styles.label}>
              Группа
            </label>
            <select
              id="groupId"
              {...register('groupId', {
                setValueAs: (value) => value === '' ? undefined : parseInt(value)
              })}
              className={styles.select}
            >
              <option value="">Выберите группу (необязательно)</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
            {errors.groupId && (
              <span className={styles.errorMessage}>{errors.groupId.message}</span>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Добавление...' : 'Добавить студента'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className={styles.cancelButton}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
