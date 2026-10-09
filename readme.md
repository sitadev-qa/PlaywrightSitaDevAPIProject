API Project Framework
---------------------


Application Programming Interface

1. Hotel Example

Entity/Actor

--> Waiter --> Customer --> Chef

--> Customer --> Visit Hotel/Cafe --> Waiter --> Get the complete order details --> Chef (Explain the order)

--> Chef --> Understand the order --> Deliver the item to Waiter --> Waiter deliver the item to Customer

Client - Server - Arch

Client --> Information --> Request
Server --> Send the response --> Response

# Restful Booker API Test Framework

Playwright API tests for the documented [Restful Booker API](https://restful-booker.herokuapp.com/apidoc/index.html). The suite uses JavaScript, Playwright's isolated API request fixture, unique test bookings, and authenticated cleanup.

## Prerequisites

- Node.js 20 or newer
- Java 11 or newer to generate the Allure HTML report

Install dependencies with `npm install`.

## Run

```powershell
npm run test:api
npm run report:allure
npm run report:allure:open
```

Set `API_BASE_URL`, `API_USERNAME`, and `API_PASSWORD` in the environment to target another environment or credentials. Defaults target the public Restful Booker demo API.

## Endpoint Coverage

The suite covers all 8 documented HTTP operations. This is endpoint/operation coverage, not source-code line or branch coverage: the system under test is a remote API, so its server-side source coverage is not available to this project.

| Operation | Coverage |
| --- | --- |
| `GET /ping` | Health status and body |
| `POST /auth` | Token creation |
| `GET /booking` | ID listing and guest-name filtering |
| `POST /booking` | Booking creation |
| `GET /booking/:id` | Full booking response |
| `PUT /booking/:id` | Full replacement and missing-auth rejection |
| `PATCH /booking/:id` | Partial update with unchanged fields retained |
| `DELETE /booking/:id` | Authenticated deletion |

Every documented operation is exercised by at least one assertion-bearing test. The booking tests use unique records and attempt cleanup even after assertion failures.

## Project Layout

```text
src/
	api/          Endpoint client methods
	config/       Base URL and credential configuration
	data/         Booking payload factory
	fixtures/     Shared Playwright API fixture
	utils/        Reusable response assertions
tests/
	api/          Health, auth, booking retrieval, and lifecycle specs
allure-results/ Generated test result data (git-ignored)
allure-report/  Generated HTML report (git-ignored)
```

## Reports

The Allure reporter writes raw test results to `allure-results/`. `npm run report:allure` builds the browsable report at `allure-report/`; report generation requires Java on `PATH`.



