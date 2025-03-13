const answer_question = (question_index, answer) => {
	cy.get("textarea").eq(question_index).clear().type(answer);
	cy.findAllByText("Submit SQL").eq(question_index).click();
	cy.get(".res").eq(question_index).should("contain", "Correct answer");
};

const get_answers = (category) => {
	return cy.fixture("answers.json").then((data) => {
		console.log(data[category]);
		return cy.wrap(data[category]);
	});
};

describe("Test Suite for SQL Zoo for Project Odin", () => {
	beforeEach(() => {
		cy.visit("SQL_Tutorial");
		cy.get("h1").should("have.text", "SQL Tutorial");
	});

	// Original Prompt:
	// I am using Cypress to do End to End Testing on SQLZoo.
	// You are my Junior Developer, and I want you to write a test for SQL basics.
	// We are on the page https://sqlzoo.net/wiki/SQL_Tutorial. I have the base URL https://sqlzoo.net/wiki/ configured.

	// Do not write a describe block. In a single it block, complete the following:
	// - Click on 0 SELECT basics and verify the new url.
	// - Solve the 3 questions present on the page and verify that you got the correct answer each time.
	// - Click SELECT Quiz at the end of the page and verify the new url.
	// - Solve the 7 questions present on the page and verify that you got 7/7.

	// Further Instructions (Each line is one further prompt):
	// In step 2, the ".answer" selector doesn't exist. Find the input another way.
	// That works! Good job. However, you need to clear the text before you add your answer. Also, you need to fix the value="Run" selector. That isn't a valid selector.
	// I see you're struggling so I will tell you that the button has the class "submitSQL"
	// Your feedback class selector should be res, and the results don't contain Well done. They contain "Correct answer".
	// Steps 1-3 are looking good! Good job. On step 4, q1 isn't a valid selector. The class name is q.
	// Awesome! One more thing. The questions don't have inputs. The answer options are contained in pre elements.
	// Select the correct pre based on index instead
	// Note that questions 2, 4, and 5 use tables instead of pres.
	// The submit button says Score the test
	// Just click on it based on the text
	// The answer indicies for step 4 are, in order, 2, 4, 4, 2, 2, 2, 2. Also the response should be Your score is: 7 out of 7
	// Use the feedback class selector to check the score
	// Select just based on table, not table td.
	// The table in question 5 counts toward the index count, so increase the selected index by 1. Also, use have.text instead of contain when you check the feedback.

	// Reflection:
	// I knew I could get the AI to answer the actual questions pretty easily if I copied and pasted them, but I was curious how it would do with End to End Testing.
	// The answer is... not well.
	// Despite being able to look at the page in step 2 and answer the questions correctly, it couldn't find the selectors contained in the page html.
	// Instead, it would just base it off of best guesses for what those selectors could be.
	// Thus, I had to provide it a lot of information concerning the page html.
	// It also made a lot of random assumptions about what the text on the page would be... again, despite being able to read the page so far as finding the questions and answering them correctly.
	// Thus, I had to provide it the text to check for.
	// It also struggled to find where on the page the correct answers are, again due to its struggle with html.
	// To be fair, though, a lot of the revisions were because I was trying to solve problems with it step by step, and didn't look ahead to anticipate what issues it may have, like the index errors, etc.

	// Visit the url provided and write a test that satisfies these conditions.
	it("performs SQL basics and quiz verification", () => {
		// Step 1: Click on '0 SELECT basics' and verify the new URL
		cy.contains("0 SELECT basics").click();
		cy.url().should("include", "/SELECT_basics");

		// Step 2: Solve the 3 questions on SELECT basics page
		// Question 1: Show the population of Germany
		cy.get("textarea").eq(0).clear().type("SELECT population FROM world WHERE name = 'Germany'");
		cy.get(".submitSQL").eq(0).click();
		cy.get(".res").eq(0).should("contain", "Correct answer");

		// Question 2: Show the name and population for Sweden, Norway, and Denmark
		cy.get("textarea").eq(1).clear().type("SELECT name, population FROM world WHERE name IN ('Sweden', 'Norway', 'Denmark')");
		cy.get(".submitSQL").eq(1).click();
		cy.get(".res").eq(1).should("contain", "Correct answer");

		// Question 3: Show countries with an area between 200,000 and 250,000
		cy.get("textarea").eq(2).clear().type("SELECT name, area FROM world WHERE area BETWEEN 200000 AND 250000");
		cy.get(".submitSQL").eq(2).click();
		cy.get(".res").eq(2).should("contain", "Correct answer");

		// Step 3: Click on SELECT Quiz at the end of the page and verify the new URL
		cy.contains("SELECT Quiz").click();
		cy.url().should("include", "/SELECT_Quiz");

		// Step 4: Solve the 7 quiz questions by selecting the correct answer options by index
		// Based on the provided indices: 2, 4, 4, 2, 2, 2, 2

		// Question 1 - index 2
		cy.get(".q").eq(0).find("pre").eq(2).click();

		// Question 2 - index 4 (using table selector)
		cy.get(".q").eq(1).find("table").eq(4).click();

		// Question 3 - index 4
		cy.get(".q").eq(2).find("pre").eq(4).click();

		// Question 4 - index 2 (using table selector)
		cy.get(".q").eq(3).find("table").eq(2).click();

		// Question 5 - index 2 (using table selector, increased by 1 to account for table in count)
		cy.get(".q").eq(4).find("table").eq(3).click();

		// Question 6 - index 2
		cy.get(".q").eq(5).find("pre").eq(2).click();

		// Question 7 - index 2
		cy.get(".q").eq(6).find("pre").eq(2).click();

		// Submit quiz answers by clicking on the button with text "Score the test"
		cy.contains("Score the test").click();

		// Verify 7/7 score using the feedback class selector with have.text instead of contain
		cy.get(".feedback").should("have.text", "Your score is: 7 out of 7");
	});
	it("verifies questions on 1 SELECT name", () => {
		// Click on the SELECT name button and verify it takes us to the right page
		cy.findAllByText("1 SELECT name").click();
		cy.url().should("contain", "/SELECT_names");

		get_answers("1_SELECT_name").then((expected) => {
			const answers = Object.values(expected);

			// Answer all of the questions on the page
			answers.forEach((answer, index) => {
				answer_question(index, answer);
			});
		});
	});
});
