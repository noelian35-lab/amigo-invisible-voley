const AVATAR_CATEGORIES = [
    {
        name: "🎅 Navidad & Volei",
        avatars: [
            { id: 'grinch', label: 'El Grinch', icon: '🤢' },
            { id: 'santa', label: 'Papa Noel', icon: '🎅' },
            { id: 'mrs_claus', label: 'Mama Noel', icon: '🤶' },
            { id: 'elf', label: 'Elfo Travieso', icon: '🧝' },
            { id: 'rudolph', label: 'Reno Rematador', icon: '🦌' },
            { id: 'snowman', label: 'Muñeco de Nieve', icon: '☃️' },
            { id: 'tree_voley', label: 'Árbol Navideño', icon: '🎄' }
        ]
    },
    {
        name: "🐾 Animales Voleibolistas",
        avatars: [
            { id: 'cat_spiker', label: 'Gato Rematador', icon: '🐱' },
            { id: 'dog_libero', label: 'Perro Líbero', icon: '🐶' },
            { id: 'bear_setter', label: 'Oso Colocador', icon: '🐻' },
            { id: 'fox_tactics', label: 'Zorro Estratega', icon: '🦊' },
            { id: 'panda_block', label: 'Panda Bloqueador', icon: '🐼' },
            { id: 'unicorn_ace', label: 'Unicornio Saque Directo', icon: '🦄' },
            { id: 'tiger_power', label: 'Tigre Potencia', icon: '🐯' }
        ]
    },
    {
        name: "🔥 Memes & Post-Partido",
        avatars: [
            { id: 'net_fail', label: '¡En la Red!', icon: '🕸️' },
            { id: 'ball_face', label: 'Balón a la Cara', icon: '🤪' },
            { id: 'beer_third_time', label: 'Cerveza Post-Partido', icon: '🍻' },
            { id: 'pizza_team', label: 'Pizza de Equipo', icon: '🍕' },
            { id: 'queen_court', label: 'Reina de la Pista', icon: '👑' },
            { id: 'fire_ace', label: 'Saque de Fuego', icon: '🔥' },
            { id: 'injured_hero', label: 'Kinesiotape & Hielo', icon: '🩹' }
        ]
    },
    {
        name: "🏐 Clásicos Club Esparreguera",
        avatars: [
            { id: 'voley_purple', label: 'Balón Lila', icon: '🏐' },
            { id: 'purple_heart', label: 'Corazón Lila', icon: '💜' },
            { id: 'trophy', label: 'Copa Campeonas', icon: '🏆' },
            { id: 'gold_medal', label: 'Medalla de Oro', icon: '🥇' },
            { id: 'gift_box', label: 'Regalo Amigo Invisible', icon: '🎁' },
            { id: 'star_player', label: 'Estrella MVP', icon: '⭐' }
        ]
    }
];

const ALL_AVATARS = AVATAR_CATEGORIES.flatMap(cat => cat.avatars);

const DEFAULT_PLAYERS = [
    {
        id: '1',
        name: 'Paula',
        position: 'Colocadora',
        avatar: '👑',
        wishes: ['Calcetines de voleibol blancos o lilas', 'Cinta para el pelo ancha'],
        dontWants: ['Colonias de olor muy dulce', 'Tazas de café'],
        size: 'M',
        shoeSize: '39 EU',
        color: 'Lila / Morado',
        notes: 'Me encantan los chocolates y snacks salados.'
    },
    {
        id: '2',
        name: 'Laura',
        position: 'Rematadora',
        avatar: '🤢',
        wishes: ['Manga de compresión para brazo', 'Botella térmica para agua (1L)'],
        dontWants: ['Maquillaje', 'Velas aromáticas'],
        size: 'S',
        shoeSize: '38 EU',
        color: 'Negro / Lila',
        notes: 'Siempre me faltan gomas de pelo para los entrenos.'
    },
    {
        id: '3',
        name: 'Marta',
        position: 'Líbero',
        avatar: '🐶',
        wishes: ['Rodilleras acolchadas blancas', 'Toalla de microfibra deportiva'],
        dontWants: ['Libretas o agendas de papel'],
        size: 'XS',
        shoeSize: '37 EU',
        color: 'Morado Esparreguera',
        notes: 'Prefiero cosas útiles para los partidos.'
    }
];

let players = [];
let activePlayerId = null;
let selectedAddAvatar = '🏐';
let selectedEditAvatar = '🏐';

window.onload = function() {
    loadData();
    renderHomeGrid();
    renderAvatarPickers();
};

function loadData() {
    const saved = localStorage.getItem('voley_esparreguera_amigo_invisible');
    if (saved) {
        try {
            players = JSON.parse(saved);
        } catch(e) {
            players = DEFAULT_PLAYERS;
        }
    } else {
        players = DEFAULT_PLAYERS;
        saveData();
    }
}

function saveData() {
    localStorage.setItem('voley_esparreguera_amigo_invisible', JSON.stringify(players));
}

function renderHomeGrid() {
    const grid = document.getElementById('playersGrid');
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    grid.innerHTML = '';

    const filtered = players.filter(p => p.name.toLowerCase().includes(search) || (p.position && p.position.toLowerCase().includes(search)));
    document.getElementById('totalPlayersCount').innerText = players.length;

    filtered.forEach(player => {
        const wishCount = player.wishes ? player.wishes.length : 0;
        const hasInfo = wishCount > 0;

        const card = document.createElement('div');
        card.className = "glass-card rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-white flex flex-col justify-between group";
        card.onclick = () => openProfileView(player.id);

        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between mb-3">
                    <span class="text-4xl bg-purple-100 p-2.5 rounded-2xl border border-purple-200">${player.avatar || '🏐'}</span>
                    <span class="text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${hasInfo ? 'bg-purple-100 text-esparreguera-purple border border-purple-300' : 'bg-slate-100 text-slate-500'}">
                        ${hasInfo ? `💜 ${wishCount} deseos` : '⏳ Sin rellenar'}
                    </span>
                </div>
                <h3 class="text-xl font-black font-heading text-esparreguera-dark group-hover:text-esparreguera-violet transition-colors">
                    ${escapeHtml(player.name)}
                </h3>
                <p class="text-xs font-bold text-slate-500 mb-3">
                    🏐 ${escapeHtml(player.position || 'Jugadora Esparreguera')}
                </p>
            </div>

            <div class="mt-4 pt-3 border-t border-purple-100 flex justify-between items-center text-xs font-black text-esparreguera-violet">
                <span>Ver / Editar Perfil</span>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        `;
        grid.appendChild(card);
    });
}

function showHomeView() {
    document.getElementById('homeView').classList.remove('hidden');
    document.getElementById('profileView').classList.add('hidden');
    renderHomeGrid();
}

function openProfileView(id) {
    activePlayerId = id;
    const player = players.find(p => p.id === id);
    if (!player) return;

    document.getElementById('profileNameDisplay').innerText = player.name;
    document.getElementById('profilePosDisplay').innerText = player.position || 'Club Volei Esparreguera';
    document.getElementById('profileAvatarDisplay').innerText = player.avatar || '🏐';

    document.getElementById('editName').value = player.name;
    document.getElementById('editPosition').value = player.position || '';
    document.getElementById('editSize').value = player.size || '';
    document.getElementById('editShoeSize').value = player.shoeSize || '';
    document.getElementById('editColor').value = player.color || '';
    document.getElementById('editNotes').value = player.notes || '';

    selectedEditAvatar = player.avatar || '🏐';
    updateAvatarPickerUI('avatarPickerContainer', selectedEditAvatar, (av) => {
        selectedEditAvatar = av;
        document.getElementById('profileAvatarDisplay').innerText = av;
    });

    renderWishList(player.wishes || []);
    renderDontWantList(player.dontWants || []);

    const index = players.findIndex(p => p.id === id);
    document.getElementById('profileNavIndex').innerText = `${index + 1} / ${players.length}`;

    document.getElementById('homeView').classList.add('hidden');
    document.getElementById('profileView').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateProfile(direction) {
    const currentIndex = players.findIndex(p => p.id === activePlayerId);
    if (currentIndex === -1) return;
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = players.length - 1;
    if (nextIndex >= players.length) nextIndex = 0;
    openProfileView(players[nextIndex].id);
}

function saveCurrentProfile() {
    if (!activePlayerId) return;
    const player = players.find(p => p.id === activePlayerId);
    if (!player) return;

    const name = document.getElementById('editName').value.trim();
    if (!name) {
        alert("El nombre no puede estar vacío");
        return;
    }

    player.name = name;
    player.position = document.getElementById('editPosition').value.trim();
    player.avatar = selectedEditAvatar;
    player.size = document.getElementById('editSize').value.trim();
    player.shoeSize = document.getElementById('editShoeSize').value.trim();
    player.color = document.getElementById('editColor').value.trim();
    player.notes = document.getElementById('editNotes').value.trim();

    saveData();
    
    // Pop-up de confirmación y vuelta automática al inicio
    alert("💜 ¡Perfil guardado correctamente!");
    showHomeView();
}

function deleteCurrentPlayer() {
    if (!activePlayerId) return;
    const player = players.find(p => p.id === activePlayerId);
    if (!player) return;

    if (confirm(`¿Seguro que quieres eliminar a ${player.name} de la lista del equipo?`)) {
        players = players.filter(p => p.id !== activePlayerId);
        saveData();
        showHomeView();
    }
}

function renderWishList(items) {
    const list = document.getElementById('wishList');
    list.innerHTML = '';
    if (items.length === 0) {
        list.innerHTML = `<li class="text-xs text-slate-400 italic">No has añadido ideas de regalo todavía.</li>`;
        return;
    }
    items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.className = "flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-emerald-200 text-sm font-semibold text-slate-700 shadow-sm";
        li.innerHTML = `
            <span>🎁 ${escapeHtml(item)}</span>
            <button onclick="removeWishItem(${idx})" class="text-slate-400 hover:text-rose-600 font-bold px-1">✕</button>
        `;
        list.appendChild(li);
    });
}

function addWishItem() {
    const input = document.getElementById('wishInput');
    const val = input.value.trim();
    if (!val || !activePlayerId) return;
    const player = players.find(p => p.id === activePlayerId);
    if (player) {
        if (!player.wishes) player.wishes = [];
        player.wishes.push(val);
        renderWishList(player.wishes);
        input.value = '';
    }
}

function removeWishItem(idx) {
    const player = players.find(p => p.id === activePlayerId);
    if (player && player.wishes) {
        player.wishes.splice(idx, 1);
        renderWishList(player.wishes);
    }
}

function renderDontWantList(items) {
    const list = document.getElementById('dontWantList');
    list.innerHTML = '';
    if (items.length === 0) {
        list.innerHTML = `<li class="text-xs text-slate-400 italic">No has puesto nada en la lista de cosas a evitar.</li>`;
        return;
    }
    items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.className = "flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-rose-200 text-sm font-semibold text-slate-700 shadow-sm";
        li.innerHTML = `
            <span>❌ ${escapeHtml(item)}</span>
            <button onclick="removeDontWantItem(${idx})" class="text-slate-400 hover:text-rose-600 font-bold px-1">✕</button>
        `;
        list.appendChild(li);
    });
}

function addDontWantItem() {
    const input = document.getElementById('dontWantInput');
    const val = input.value.trim();
    if (!val || !activePlayerId) return;
    const player = players.find(p => p.id === activePlayerId);
    if (player) {
        if (!player.dontWants) player.dontWants = [];
        player.dontWants.push(val);
        renderDontWantList(player.dontWants);
        input.value = '';
    }
}

function removeDontWantItem(idx) {
    const player = players.find(p => p.id === activePlayerId);
    if (player && player.dontWants) {
        player.dontWants.splice(idx, 1);
        renderDontWantList(player.dontWants);
    }
}

function renderAvatarPickers() {
    updateAvatarPickerUI('addAvatarPicker', selectedAddAvatar, (av) => {
        selectedAddAvatar = av;
    });
}

function updateAvatarPickerUI(containerId, currentSelected, onSelectCallback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    AVATAR_CATEGORIES.forEach(cat => {
        const groupDiv = document.createElement('div');
        groupDiv.className = "w-full mb-2";
        
        const title = document.createElement('span');
        title.className = "block text-[10px] font-black uppercase text-purple-700 mb-1";
        title.innerText = cat.name;
        groupDiv.appendChild(title);

        const row = document.createElement('div');
        row.className = "flex flex-wrap gap-1.5";

        cat.avatars.forEach(av => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const isSelected = currentSelected === av.icon;
            btn.className = `w-9 h-9 rounded-xl text-lg flex items-center justify-center transition border ${isSelected ? 'bg-esparreguera-violet text-white border-esparreguera-dark shadow-md scale-105' : 'bg-white hover:bg-purple-100 border-purple-200'}`;
            btn.title = av.label;
            btn.innerText = av.icon;
            btn.onclick = () => {
                onSelectCallback(av.icon);
                updateAvatarPickerUI(containerId, av.icon, onSelectCallback);
            };
            row.appendChild(btn);
        });

        groupDiv.appendChild(row);
        container.appendChild(groupDiv);
    });
}

function openAddPlayerModal() {
    document.getElementById('newPlayerName').value = '';
    document.getElementById('newPlayerPos').value = '';
    selectedAddAvatar = '🏐';
    renderAvatarPickers();
    document.getElementById('addPlayerModal').classList.remove('hidden');
}

function closeAddPlayerModal() {
    document.getElementById('addPlayerModal').classList.add('hidden');
}

function confirmAddPlayer() {
    const name = document.getElementById('newPlayerName').value.trim();
    if (!name) {
        alert("Por favor, escribe el nombre de la jugadora.");
        return;
    }
    const position = document.getElementById('newPlayerPos').value.trim();

    const newPlayer = {
        id: 'p_' + Date.now(),
        name: name,
        position: position || 'Jugadora Esparreguera',
        avatar: selectedAddAvatar,
        wishes: [],
        dontWants: [],
        size: '',
        shoeSize: '',
        color: '',
        notes: ''
    };

    players.push(newPlayer);
    saveData();
    closeAddPlayerModal();
    showHomeView();
}

function copyAllSummaries() {
    if (players.length === 0) {
        alert("No hay jugadoras en la lista.");
        return;
    }

    let text = "🏐 *LISTA DE DESEOS - AMIGO INVISIBLE CV ESPARREGUERA* 🎁\n\n";
    players.forEach((p, idx) => {
        text += `${idx + 1}. *${p.name}* (${p.position || 'Jugadora'}) ${p.avatar || '🏐'}\n`;
        if (p.wishes && p.wishes.length > 0) {
            text += `   🎁 *Sí quiero:* ${p.wishes.join(', ')}\n`;
        } else {
            text += `   🎁 *Sí quiero:* (Sin especificar)\n`;
        }
        if (p.dontWants && p.dontWants.length > 0) {
            text += `   ❌ *Evitar:* ${p.dontWants.join(', ')}\n`;
        }
        if (p.size || p.shoeSize || p.color) {
            text += `   👕 *Tallas/Color:* ${[p.size ? 'Talla: '+p.size : '', p.shoeSize ? 'Calzado: '+p.shoeSize : '', p.color ? 'Color: '+p.color : ''].filter(Boolean).join(' - ')}\n`;
        }
        if (p.notes) {
            text += `   📌 *Notas:* ${p.notes}\n`;
        }
        text += `\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
        alert("¡Resumen copiado al portapapeles! Ya puedes pegarlo en WhatsApp 📱");
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#039;');
}
