# Project Description: Credit-Analyze-Portal

**Credit-Analyze-Portal** is a robust and scalable solution developed to automate the analysis of invoices and offer loans to the end user based on the extracted data. The application utilizes a microservices architecture in Node.js and TypeScript, with a React frontend, designed to facilitate the process of uploading, extracting, and validating invoices, providing an intuitive and efficient user experience.

## Architecture Overview

The architecture of **Credit-Analyze-Portal** is implemented on AWS, leveraging managed services to ensure high availability, security, and scalability. Below is a summary of the main components and their functionality:

## Main Components

### Frontend: Credit-Analyze-Portal

- **Technologies**: React, TypeScript, Tailwind CSS, AWS Amplify
- **Features**:
  - **Login and Registration**: User authentication using Amazon Cognito, which manages access and ensures data security.
  - **File Upload**: Allows users to upload invoices in .png, .jpg, and .pdf formats.
  - **Analysis History**: Displays the history of analysis requests made by the user, showing whether they were approved or rejected.

### Backend Microservices

#### Credit-Analyze-Invoice

- **Responsibility**: Receives the invoice files uploaded from the frontend, stores them in Amazon S3, extracts relevant data using Amazon Textract, and publishes this data to SQS for further processing.
- **Technologies**: Node.js, TypeScript, Amazon S3, Amazon Textract, SQS

#### Credit-Analyze-Credit-Engine

- **Responsibility**: Validates the extracted invoice data, checking payment date and CPF/CNPJ. After validation, it publishes the result (APPROVED or REJECTED) to another SQS topic.
- **Technologies**: Node.js, TypeScript, SQS, MongoDB Atlas

### Data Storage

- **Amazon S3**: Stores the invoice files uploaded by users.
- **MongoDB Atlas**: Database used to store the processed invoice data and analysis results.

### Communication and Messaging

- **SQS**: Implements asynchronous communication between microservices, orchestrating messages between different parts of the system:
  - **Queue invoice-data-extracted**: Publishes the extracted invoice data.
  - **Queue invoice-validation-result**: Publishes the invoice validation result.

### Automation and Notification

- **Nodemailer**: Service used to send email notifications to users with the results of the analyses performed.

## Workflow

1. **Authentication**: The user accesses the Credit-Analyze-Portal and logs in or registers through Amazon Cognito.
2. **File Upload**: The user uploads an invoice. The Credit-Analyze-Invoice service stores the file in Amazon S3 and extracts relevant data using Amazon Textract.
3. **Data Publication**: The extracted data is published to the invoice-data-extracted queue in SQS.
4. **Validation**: The Credit-Analyze-Credit-Engine service consumes the data from SQS, validates the information (such as payment date and CPF/CNPJ), and publishes the result to the invoice-validation-result queue.
5. **Notification and Display**: The analysis result is sent to the user via email using Nodemailer and is also displayed on the frontend in the analysis history section.

## Benefits and Considerations

- **Scalability**: The microservices architecture and use of SQS allow the system to easily scale to handle a large volume of data and requests.
- **Security**: Authentication and authorization are managed by Amazon Cognito, ensuring that only authorized users have access to system functionalities.
- **Automation**: Automatic extraction and validation of invoice data reduce the need for manual intervention, providing a faster and more efficient user experience.
- **Modularity**: The clear separation between microservices allows for easier maintenance and the possibility of evolving the system in a modular fashion.


### 🤝 Contributors

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/88459755?v=4" width="100px;" border-radius='50%' alt="Diogo Gallina's photo on GitHub"/><br>
        <sub>
          <b>Diogo Gallina</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

