
  
  import '../../../../core/usecases/usecase.dart';
  import '../../../../core/network/dio/api_result.dart';
  import '../../data/models/login_model.dart';
  import '../../data/models/login_parameter.dart';
  import '../repositories/login_repositories.dart';


  
  class LoginUseCase implements UseCase<ApiResult<LoginModel>, LoginParameter> {


   LoginRepositories loginRepositories;
   LoginUseCase({required this.loginRepositories});
   
   @override
     Future<ApiResult<LoginModel>> call(LoginParameter parameter) {

       return loginRepositories.login(parameter);
     }
     
     
     
}     

    
  