package com.payease.api_gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtAuthFilter extends AbstractGatewayFilterFactory<JwtAuthFilter.Config> {

    private final List<String> OPEN_ROUTES = List.of(
        "/auth/otp/send",
        "/auth/otp/verify",
        "/auth/mpin/set",
        "/auth/login",
        "/customer/register"
    );

    public JwtAuthFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getPath().toString();

            // Skip JWT check for open routes
            if (OPEN_ROUTES.contains(path)) {
                return chain.filter(exchange);
            }

            // Check Authorization header
            String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            // Extract token
            String token = authHeader.substring(7);
            
            // TODO: Validate token using JWT utility
            // String customerId = jwtUtil.extractCustomerId(token);
            
            // Add X-Customer-Id header for downstream services
            ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
                .header("X-Customer-Id", "customer-id-from-token")
                .build();

            return chain.filter(exchange.mutate().request(modifiedRequest).build());
        };
    }

    public static class Config {
    }
}