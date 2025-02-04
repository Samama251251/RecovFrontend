    
    
 import 'package:flutter_bloc/flutter_bloc.dart';
 import 'login_state.dart';
  import '../../data/models/login_parameter.dart';
  import '../../domain/use_cases/login_use_case.dart';
 

 class LoginCubit extends Cubit<LoginState> {
 
LoginUseCase loginUseCase;
 
LoginCubit({required this.loginUseCase}) : super(LoginState.initial());


 
   

    
     Future<void> login(LoginParameter loginParameter) async {
       emit(LoginState.loginLoading());
       var dataResult = await loginUseCase(loginParameter);
    
        dataResult.when(success: (data) {
        
        emit(LoginState.loginSuccess(result: data));
       }, failure: (error) {
       
    
                      
        emit(LoginState.loginFailure(error: error.apiErrorModel.message ?? ''));
       });
    
      }


}