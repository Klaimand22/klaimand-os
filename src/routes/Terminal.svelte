<script>
    import { writable } from 'svelte/store';
    import { handleCommand, terminal, currentDirectory, currentPath, content, projects, commands } from './store.js';
</script>

<style>
    /* Terminal styles */
    .terminal {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 15px;
        background-color: black;
        color: rgb(255, 255, 255);
        height: 100%;
        width: 100%;
        overflow-y: auto;
        font-family: 'Courier New', monospace;
        font-size: 16px;
    }

    .prompt {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #00ff00;
        font-family: 'Courier New', monospace;
    }

    .square {
        width: 20px;
        height: 20px;
        background-color: #00ff00;
        margin-right: 10px;
    }

    .directory {
        margin-right: 10px;
    }

    .input {
        background-color: black;
        color: white;
        border: none;
        outline: none;
        padding: 10px;
        font-family: 'Courier New', monospace;
        font-size: 16px;
    }

    .input::placeholder {
        color: #888;
    }
</style>

<div class="terminal">
    {#each $terminal as line}
        <p>{line}</p>
    {/each}
    <div class="prompt">
        <div class="square"></div>
        <span class="directory">{ $currentDirectory }</span>
        <input type="text" class="input" on:keydown={handleCommand} placeholder="Entrer une commande" />
    </div>
</div>
