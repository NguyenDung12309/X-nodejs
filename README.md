### Git Rules

1. **Branch Naming Convention:**

   - Feature branch: `feature/name-branch`
   - Bug fix branch: `fix-bug/name-branch`

2. **Commit Message Format:**

   - Format: `[action]: content`
     - Example: `feat: add login screen`

3. **Branch Management:**

   - Each team member works on their own branch.
   - Direct pushes to `developer` or `master` branches are not allowed.

4. **Branch Integration:**

   - Use `git rebase` instead of `git merge` for branch integration.

5. **Pull Request Guidelines:**

   - Each branch should ideally have only one commit when creating a Pull Request (PR).
   - Multiple commits during development are acceptable, but squash them into one commit before creating the PR.

6. **Development Environment:**
   - Use Node.js version >= 20 for development.
   - To start running the project, use `yarn add .` to install dependencies.
   - Execute `yarn dev` to run the development server or start the development environment.
