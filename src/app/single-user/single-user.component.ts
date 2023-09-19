import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { User } from 'models/user';
import { UserService } from 'services/user.service';
import { Text } from '@angular/compiler';
import { Params,Router} from '@angular/router';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  user_id:number=0
  user:User=new User(0,"","","","","","",0,"","","","","","")

  constructor(private activateRoute:ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params:Params)=>{
      let id_passed=params['id'];
      console.log(id_passed);
      this.user_id=id_passed;
      this.userService.getUserById(this.user_id).subscribe(data=>{
        this.user=data;
      })
    })
  }

}
