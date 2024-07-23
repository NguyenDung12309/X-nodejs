### Git Rules

1. **Branch Naming Convention:**

   - Feature branch: `feature/[id-task]`
     - Example: `feature/ADA-396`
   - Bug fix branch: `fix-bug/[id-task]`
     - Example: `fix-bug/ADA-396`

2. **Commit Message Format:**

   - Format: `[action]: [id-task] content`
     - Example: `feat: [ADA-396] add login screen`

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
