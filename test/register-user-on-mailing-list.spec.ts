import { RegisterUserOnMailingList } from "../src/register-user-on-mailing-list"
import { UserRepository } from "../src/user-repository";


describe("Register user on mailing list",()=>{

    const RegisterUserOnMainlingList = new RegisterUserOnMailingList();
    const Repository = new UserRepository()

    test("Should return null if the email already exists",()=>{

        const Data ={
            name:"Edrey",
            email:"edrey@gmail.com"
        }
        Repository.add(Data)
        const response = RegisterUserOnMainlingList.execute(Data)
        
        expect(response).toBe(null)
    })
})