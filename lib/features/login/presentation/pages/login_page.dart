
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/cupertino.dart';
import '../../../../di/injection_container.dart';
import '../cubit/login_cubit.dart';
 class LoginPage extends StatelessWidget  {
   LoginPage({super.key});
    
     static Route route(RouteSettings routeSettings) {
      return CupertinoPageRoute(
       builder: (_) => BlocProvider(
       create: (_) => sl<LoginCubit>(),
       child: LoginPage(),
   ),
  );
     }
    
  @override
  Widget build(BuildContext context) {
   return Scaffold(
    body: Container(

    )
   );
  }


}