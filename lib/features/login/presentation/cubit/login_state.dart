 import 'package:freezed_annotation/freezed_annotation.dart';
import '../../data/models/login_model.dart';
part 'login_state.freezed.dart';
 
 
 @Freezed()
 abstract  class LoginState  with _$LoginState {
  const factory LoginState.initial() = _Initial;
   const factory LoginState.loginLoading() = LoginLoading;
  const factory LoginState.loginSuccess({required LoginModel result}) = LoginSuccess;
  const factory LoginState.loginFailure({required String error}) = LoginFailure;
 }


