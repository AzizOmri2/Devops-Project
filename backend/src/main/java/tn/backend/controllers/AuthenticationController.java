package tn.backend.controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import tn.backend.dto.AuthenticationRequest;
import tn.backend.entities.User;
import tn.backend.repository.UserRepository;
import tn.backend.services.UserService;
import tn.backend.utils.JwtUtil;

import java.io.IOException;


@RestController
public class AuthenticationController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil ;
    public static final String TOKEN_PREFIX ="bearer";
    public static final String HEADER_STRING ="Authorization";


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/authenticate")
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest , HttpServletResponse response) throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException, JSONException, ServletException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        }
        catch (BadCredentialsException badCredentialsException) {
            throw new BadCredentialsException("Incorrect username or password !!! ");
        } catch (DisabledException disabledException) {
            response.sendError(HttpServletResponse.SC_NOT_ACCEPTABLE, "User is not activated");
            return ;
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        User user = userRepository.findFirstByEmail(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(authenticationRequest.getEmail());

        if (user != null) { // Vérifiez si l'utilisateur existe
            // Création de la réponse JSON
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("userID", user.getId());
            jsonResponse.put("token", jwt);

            // Ajout de la réponse JSON à la réponse HTTP
            response.getWriter().write(jsonResponse.toString());
        }


        response.addHeader("access-control-expose-headers","Authorization");
        response.setHeader("Access-control-allow-Headers", "Authorization,X-PINGOTHER,X-Requested-With,Content-Type,Accept,X-Custom-header");
        response.setHeader(HEADER_STRING,TOKEN_PREFIX+jwt);

    }

}
