<script>
	import '../app.css'

	import './layout.css';

	let { children } = $props();
</script>


<nav>
	<div class="nav-inner">

		<a href="/" class="site-title">Miao Wang</a>

		<div class="nav-links">

			<a href="/">Home</a>
			<a href="/cv">CV</a>
			<a href="/writings">Writings</a>
			<a href="/films">FilmStack</a>
		</div>
	</div>
</nav>

<main>{@render children()}</main>
<footer><p>© 2026 Miao Wang · Built with SvelteKit</p></footer>

<style>
	:global(body) {
		margin: 0;
		font-family: Georgia, 'Times New Roman', serif;
		color: #1a1a1a;
		background-color: #ffffff;
		line-height: 1.6;
	}

	:global(a) {
		color: #cf1a09;
		text-decoration: underline;
	}

	:global(a:hover) {
		text-decoration: none;
	}

	nav {
		background-color: #1a1a1a;
		padding: 0.75rem 1.5rem;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.nav-inner {
		max-width: 900px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.site-title {
		color: white;
		font-size: 1.3rem;
		font-weight: bold;
		text-decoration: none;
	}

	.site-title:hover {
		color: #ddd;
		text-decoration: none;
	}

	.nav-links {
		display: flex;
		gap: 1.5rem;
	}

	.nav-links a {
		color: #ccc;
		text-decoration: none;
		font-size: 0.95rem;
	}

	.nav-links a:hover {
		color: white;
		text-decoration: none;
	}

	main {
		max-width: 900px;
		margin: 2rem auto;
		padding: 0 1.5rem;
		min-height: 60vh;
	}

	footer {
		text-align: center;
		padding: 2rem 1rem;
		color: #888;
		font-size: 0.85rem;
		border-top: 1px solid #e0e0e0;
		margin-top: 3rem;
	}
</style>
