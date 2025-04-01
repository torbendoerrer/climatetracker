package com.climatetracker.backend.controller.user_dto;

import io.micrometer.common.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
    private String username;
    @Nullable
    private String updatedUsername;
    @Nullable
    private String password;
}
