interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  groupId?: number;
  isDeleted?: boolean;
};

export default StudentInterface;
