export interface UserProps {
    name: string;
    email: string;
    cellphone: string;
    password: string;
}

export class Users{
   private props: UserProps;

    constructor(props : UserProps){
        this.props = props;
    }

    
    public set name(name: string){
        this.props.name = name;
    }
    public set email(email: string){
        this.props.email = email;
    }
    public set cellphone(cellphone: string){
        this.props.cellphone = cellphone;
    }
    public set password(password: string){
        this.props.password = password;
    }


    public get name(){
        return this.props.name;
    }
    public get email(){
        return this.props.email;
    }
    public get cellphone(){
        return this.props.cellphone;
    }
    public get password(){
        return this.props.password;
    }
}