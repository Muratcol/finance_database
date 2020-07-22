import { Component, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInfos } from './userInfos';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],

})
export class UserComponent implements OnInit {

  imageToShow:string
  fileToUplod: File = null
  userInfoForm:FormGroup
  userInfo:UserInfos = new UserInfos()
  userImage: boolean
  path:string = "\\assets\\img\\"
  imageInput:string = ""



  constructor(
    private userService:UserService,
    private formBuilder:FormBuilder,
    private alertifyService:AlertifyService,
    // private domSanitizer:DomSanitizer
    
  ) {}
  datas:any = this.userService.userInfos
  
  ngOnInit(): void {
    this.createUserUpdateInfosForm()
    this.datas = this.userService.userInfos
    this.imageToShow = this.path + this.userService.userInfos['imgUrl'] 
  }


 handleFileInput(file: FileList) {
   this.fileToUplod = file.item(0)

   let reader = new FileReader();
   reader.onload = (event:any) => {
      this.imageToShow = event.target.result
      
   };
   reader.readAsDataURL(this.fileToUplod);
 }


  createUserUpdateInfosForm() {
    this.userInfoForm = this.formBuilder.group({
      username: [
        null,
        [
          Validators.maxLength(15),
        ],
      ],
      title: [null, [Validators.maxLength(20)]],
      place: [null, [Validators.maxLength(20)]],
      website: [null, [Validators.maxLength(20)]],
      about: [null, [Validators.maxLength(150)]]
    });
  }


  updateDatas() {
      this.userInfo = Object.assign({}, this.userInfoForm.value);
      this.userService.updateUserInfos(this.userInfo).subscribe((response) => {
        this.alertifyService.success('Profile Updated Succesfully');
        if (this.imageInput != null) this.userService.uploadImage(this.fileToUplod)
        .subscribe(() => {
        })
      });
    


  }
}