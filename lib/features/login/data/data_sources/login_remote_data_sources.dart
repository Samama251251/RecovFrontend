
import '../../../../core/network/dio/api_result.dart';
import '../../../../core/network/dio/api_service.dart';
 import '../../../../core/network/error_handler/error_handler.dart';
import '../models/login_parameter.dart';
import '../models/login_model.dart';
abstract class  LoginRemoteDataSource {

  Future<ApiResult<LoginModel>> login(LoginParameter loginParameter);
    
    
    
    }

class LoginRemoteDataSourceImpl implements LoginRemoteDataSource   {
  
   ApiService apiService;
   LoginRemoteDataSourceImpl({required this.apiService});

   @override
   Future<ApiResult<LoginModel>> login(LoginParameter loginParameter) async{

    try {
     final response = await apiService.login(loginParameter);
     return ApiResult.success(response);
    } catch (error) {
     return ApiResult.failure(ErrorHandler.handle(error));
    }
   }
  
  
}