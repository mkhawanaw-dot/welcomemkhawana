<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- The portfolio is a single scrolling index route with anchored navigation because the primary work CTA explicitly scrolls to projects.
- Reusable project previews and the contact form live outside routes to keep the index focused on content.
- Contact messages use insert-only browser access with database validation and no visitor read access to protect personal details.
- Downloads offer a clearly labeled profile summary until the owner supplies a full CV; never invent employment or credentials.
