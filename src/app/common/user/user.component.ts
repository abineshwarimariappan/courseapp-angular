import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

   userimages:string[];
  selected :string="";
  userForm:any;
  imgSelected:boolean=false;

  constructor(private formbuilder:FormBuilder,private us:UserService) { 

    this.userForm=this.formbuilder.group({
      username:['',[Validators.required,Validators.pattern("[a-z]{4,12}")]],
      password:['',[Validators.required,Validators.pattern("[a-z0-9_$]{6,18}")]],
      role:['user']

    });
  }

  ngOnInit(): void {
    this.us.getUserImages().subscribe(
      (data:string[])=>this.userimages=data,
      ()=>this.userimages=[]
    )
  }

  saveUser():void{
   let obj={
     username:this.userForm.value.username,
     password:this.userForm.value.password,
     role:this.userForm.value.role,
     imagefile:this.selected
   }
   if(this.imgSelected)
   this.us.storeUser(obj).subscribe(
     ()=>{
       alert('user is added ');
       this.userForm.value.username="";
       this.userForm.value.password="";
       this.selected="";
     },
     ()=>{
       alert("check username it might already exists ");
     }
   )
  }
  setSelected(str:string){

    this.imgSelected=true;
    this.selected=str;
  }

}
