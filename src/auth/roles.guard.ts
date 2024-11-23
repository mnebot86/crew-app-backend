import {
	CanActivate,
	ExecutionContext,
	Injectable,
	ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
  
	  canActivate(context: ExecutionContext): boolean {
		  console.log('RolesGuard: Checking required roles...');
	  const requiredRoles = this.reflector.get<string[]>(
		'roles',
		context.getHandler(),
	  );
  
		  console.log('Required Roles:', requiredRoles);
	  if (!requiredRoles) {
		return true;
	  }
  
	  const request = context.switchToHttp().getRequest();
	  const user = request.user;
  
	  if (!user) {
		throw new ForbiddenException('User not authenticated');
	  }
  		
	  const hasRole = requiredRoles.some((role) => user.role === role);
	  if (!hasRole) {
		throw new ForbiddenException(
		  `You do not have the required role(s).`,
		);
	  }
  
	  return hasRole;
	}
  }
