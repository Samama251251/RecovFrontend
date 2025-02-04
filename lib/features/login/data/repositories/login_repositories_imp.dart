
import '../../domain/repositories/login_repositories.dart';
import '../../../../core/network/dio/api_result.dart';
import '../../data/models/login_model.dart';
 import '../data_sources/login_remote_data_sources.dart';
 import '../data_sources/login_local_data_sources.dart';
import '../../data/models/login_parameter.dart';
class LoginRepositoriesImp extends LoginRepositories  {
  
 LoginRemoteDataSource remoteDataSource;
 LoginLocalDataSource localDataSource;
 
 LoginRepositoriesImp({required this.remoteDataSource ,required this.localDataSource});
  
  
      @override
      Future<ApiResult<LoginModel>> login(LoginParameter parameter) async{
        return await remoteDataSource.login(parameter);
      }
  
  
}