

import 'package:json_annotation/json_annotation.dart';

part 'login_parameter.g.dart';
@JsonSerializable()
class LoginParameter {
  // add your parameters here 
  String? name;

  Map<String, dynamic> toJson() => _$LoginParameterToJson(this);

}


