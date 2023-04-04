import swaggerJSDoc from "swagger-jsdoc";

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de VMV - Vanessa Medo Vocals",
      version: "1.0.0",
      description: `
      La API de Vanessa Medo Vocals brinda una solución integral para la administración de una plataforma de enseñanza de canto en línea. Esta API facilita la interacción entre estudiantes, docente y el contenido del curso, permitiendo una experiencia de aprendizaje dinámica y personalizada.

      Con esta API, los estudiantes pueden:
      
      - Acceder a una amplia variedad de ejercicios vocales, clasificados por niveles de dificultad.
      - Comentar y discutir ejercicios para fomentar el aprendizaje colaborativo.
      - Registrar y subir grabaciones de sus ejercicios y trabajos para recibir retroalimentación personalizada de la profesora.
      - Agendar clases en línea con la profesora, visualizando la disponibilidad de horarios.
      - Consultar y gestionar su historial de clases y pagos realizados.
      
      Por otro lado, la API también ofrece funcionalidades para la profesora, permitiéndole:
      
      - Confirmar y administrar las clases agendadas por los estudiantes.
      - Escuchar y proporcionar retroalimentación a las grabaciones subidas por los alumnos, ofreciendo consejos y recomendaciones para mejorar su técnica vocal.
      - Revisar y gestionar su agenda de clases, optimizando la organización de su tiempo.
      - Verificar y llevar un registro de los pagos realizados por los estudiantes.
      
      
      La API de Vanessa Medo Vocals es una herramienta versátil que potencia la enseñanza y el aprendizaje del canto, facilitando la comunicación y el acceso a recursos didácticos en una única plataforma.
      `,
    },
  },
  apis: ["./src/api/docs/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

console.log("Swagger Spec:", JSON.stringify(swaggerSpec, null, 2));

export default swaggerSpec;
