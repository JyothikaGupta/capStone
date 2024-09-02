package com.capstone.Person.mappers;

import com.capstone.Person.dto.SignUpDto;
import com.capstone.Person.dto.UserDto;
import com.capstone.Person.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}