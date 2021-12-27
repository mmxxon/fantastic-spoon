// import { Role } from "src/common/enums/app/role.enum";
import { TypeObject } from "@mui/material/styles/createPalette";
import { LongRegistrator } from "src/interfaces/services/models/User";
import { Role } from './../../common/enums/app/role.enum';
import { DocRecord } from "../../../src/interfaces/services/models/Record";
import { http } from './../http/HttpService';

interface getUserArgs{
  role: Role;
  page?: number;
  per_page?: number;
  created_by?: number;
}

interface getUserByIdArgs{
  role: Role;
  id: number;
}

interface createUserArgs{
  role: Role;
  user: LongRegistrator,
  pass: string
}

interface updateUserArgs{
  role: Role;
  user: LongRegistrator,
  pass?: string
}

export class UserService {
  static async getAllUsers(args: getUserArgs) {
    let link = '/'+args.role;
    if (args.created_by){
      link+='/'+args.created_by+'/created';
    }
    let token=localStorage.getItem('token');
    if (!token)  token = '';
    return http.get<{page?: number, per_page?: number}, LongRegistrator[]>(link, {
      headers: {
        authorization: token
      },
      params:{
        page: args.page,
        per_page: args.per_page
      }
    } );

    // get /registrator?page=&per_page=
    // get /admin?page=&per_page
  }

  static async getUserById(args: getUserByIdArgs) {
    const link = '/'+args.role+'/'+args.id;
    let token=localStorage.getItem('token');
    if (!token)  token = '';
    return http.get<null, LongRegistrator>(link, {
      headers: {
        authorization: token
      }
    });
    // get /registrator/:id
    // get /admin/:id
  }

  static async createUser(args: createUserArgs) {
    let token=localStorage.getItem('token');
    if (!token)  token = '';

    const link = '/'+args.role;
    if (args.role===Role.REGISTRATOR){
      const req={
        registrator: args.user,
        pass: args.pass
      }
      return http.post<{registrator: LongRegistrator, pass: string}, number>(link, req, {
        headers: {
          authorization: token
        }
      })

    }
    else{
      const req={
        admin: args.user,
        pass: args.pass
      }
      return http.post<{admin: LongRegistrator, pass: string}, number>(link, req, {
        headers: {
          authorization: token
        }
      })
    }
    

    // post /registrator
    // post /admin
  }

  static async updateUser(args: updateUserArgs) {
    let token=localStorage.getItem('token');
    if (!token)  token = '';
    const link = '/'+args.role;
    if (args.role===Role.REGISTRATOR){
      const req={
        registrator: args.user,
        pass: args.pass
      }
      return http.post<{registrator: LongRegistrator, pass?: string}, number>(link, req, {
        headers: {
          authorization: token
        }
      })

    }
    else{
      const req={
        admin: args.user,
        pass: args.pass
      }
      return http.post<{admin: LongRegistrator, pass?: string}, number>(link, req, {
        headers: {
          authorization: token
        }
      })
    }
    // put /registrator
    // put /admin
  }
  static async login(email: string, pass: string) {
    const res = await http.post<{email: string, pass: string}, {token: string}>('/login', {email, pass});
    console.log(res);
    return res;
  }
}
