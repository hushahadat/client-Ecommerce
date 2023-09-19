import { CanActivate } from '@angular/router';

export class AdminGaurd implements CanActivate {
  canActivate() {
    var role = localStorage.getItem('role');
    //console.log('Role is Admin');
    if (role == 'admin' || role == 'Admin') {
      //alert('Logged in as Admin');
      return true;
    } else {
      alert('Sorry No Access!! only for Admins');
      return false;
    }
  }
}
