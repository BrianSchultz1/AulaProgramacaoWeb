import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;


public class MeuServlet extends HttpServlet {
    
    private static final String LOGIN_INFO = "login";
    private static final String PERSONAL_INFO = "pessoal";
    private static final String ACADEMIC_INFO = "academico";
    private static final String PROFESSIONAL_INFO = "profissional";
    private static final int MAX_ACCESS = 3;
    private static final String EXCEEDED_SERVLET = "Excedidos";
    
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HttpSession session = request.getSession(true)
        int accessCount = (Integer) session.getAttribute("accessCount");
        if (accessCount == null) {
            accessCount = 0
        }
        accessCount++;
        session.setAttribute("accessCount", accessCount);
        
        if (accessCount >= MAX_ACCESS) {
            response.sendRedirect(EXCEEDED_SERVLET);
            return;
        }
        
        session.setAttribute(LOGIN_INFO, "informacoes de login");
        session.setAttribute(PERSONAL_INFO, "informacoes pessoais");
        session.setAttribute(ACADEMIC_INFO, "informacoes academicas");
        session.setAttribute(PROFESSIONAL_INFO, "informacoes profissionais");
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html>");
        out.println("<head><title>MeuServlet</title></head>");
        out.println("<body>");
        out.println("<h1>Informações salvas na sessão</h1>");
        out.println("</body></html>");
    }
    
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
    

