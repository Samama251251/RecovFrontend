
import '../../../../core/network/dio/api_result.dart';
 import '../../data/models/login_model.dart';
import '../../data/models/login_parameter.dart';

abstract class LoginRepositories {

     Future<ApiResult<LoginModel>> login(LoginParameter loginParameter);

}