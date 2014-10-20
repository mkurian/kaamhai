package org.kaamhai.util;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author mkurian
 *
 */
public class SimpleCORSFilter implements Filter {

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		HttpServletResponse response = (HttpServletResponse) res;
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
		response.setHeader("Access-Control-Max-Age", "14400");
		response.setHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, accept, csrftoken, authorization");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		chain.doFilter(req, res);
	}

	public void init(FilterConfig filterConfig) {}

	public void destroy() {}

}
