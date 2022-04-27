import { RegisterUserOnMailingList } from "../src/register-user-on-mailing-list"
import { EmailNotificationService } from "../src/email-notification-service";
import { UserRepository } from "../src/user-repository";

describe('EmailList', () => {

    let registerUserOnMailingList: RegisterUserOnMailingList
    let userRepository: UserRepository
    let emailNotificationService: EmailNotificationService

    //Setar em registeruseronmailinglist
    beforeEach(()=> {
        registerUserOnMailingList = new RegisterUserOnMailingList(
            userRepository = new UserRepository(),
            emailNotificationService = new EmailNotificationService()
        )
    })

    //1° caso
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


    //2° caso
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

    //3° caso
    it("Should return an error when don't sent e-mail confirmation", () => {

        const spy = jest.spyOn(emailNotificationService, "send")

        spy.mockReturnValue(false)
        expect(() => {
            registerUserOnMailingList.execute({
                name: "Jonathan",
                email: "Jonathan@gmail.com"
            })
        }).toThrow("E-mail notification not sent")
        
    })
})
