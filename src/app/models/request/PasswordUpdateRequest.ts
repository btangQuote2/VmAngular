export class PasswordUpdateRequest {
  clientId? = 'default';
  userName: string;
  oldPassword: string;
  newPassword: string;
  who? = 'ClientUser';
}
