import { RegisterUserOnMailingList } from "../src/register-user-on-mailing-list"
import { UserRepository } from "../src/user-repository";

describe('EmailList', () => {

    let registerUserOnMailingList: RegisterUserOnMailingList
    let userRepository: UserRepository

    beforeEach(function () {
        userRepository = new UserRepository();
        registerUserOnMailingList = new RegisterUserOnMailingList(userRepository)
    })

    it("Should return an error if e-mail already in use", () => {

        const findBy = jest.spyOn(userRepository, 'findBy')
        findBy.mockReturnValue(
            {
                name: "Edrey",
                email: "edrey@gmail.com"
            }
        )
        expect(() => {
            registerUserOnMailingList.execute({

                name: "Edrey",
                email: "edrey@gmail.com"
            })
        }).toThrow("User already registered")
    })


    //2º Case: User already registred - False
    it("Should return an error if user not already registred not the system", () => {
        const spy = jest.spyOn(userRepository, 'add')
        spy.mockReturnValue(false)
        expect(() => {
            registerUserOnMailingList.execute({
                name: 'Marcos',
                email: "marcos@gmail.com"
            })
        }).toThrow("User not created on database")
    })

    //3º Case: Don't send confirmation e-mail



})