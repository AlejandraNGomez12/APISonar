import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import constants from '../../shared/security/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username, roles: payload.roles };
    }
}