export class User{
    [x: string]: any;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    userType: number = 1;
    password: string = '';
    confirmPassword: string = '';
    photo: string = '';
    idNumber: number | undefined ;
    title: string = '';
    verified: boolean = false;
    references: number | undefined;
    createdAt: Date |undefined;
    updatedAt: Date |undefined
}