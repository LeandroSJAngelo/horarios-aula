
# README.md

```markdown
# School Management API

API para gestão acadêmica baseada em **NestJS + PostgreSQL**, seguindo os princípios de **Clean Architecture**.
O sistema permite consultar:

- **Carga horária total por professor** (quantidade de horas/aulas que cada professor ministra).
- **Horários livres e ocupados das salas**.

---

## Tecnologias

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/) — testes unitários

---

## Executando o Projeto

### 1) Clone o repositório
```bash
git clone https://github.com/LeandroSJAngelo/horarios-aula.git
cd horarios-aula
````

### 2) Suba os containers com Docker

```bash
docker-compose up -d
```

> Isso vai levantar:
>
> * **PostgreSQL** na porta `5432`
> * **NestJS API** na porta `3000`

### 3) Aplique o schema inicial no banco

```bash
docker exec -i school-db psql -U postgres -d school < scripts/schema.sql
docker exec -i school-db psql -U postgres -d school < scripts/seed.sql
```

---

## Endpoints

### 1) Professores — Carga horária

```http
GET /professors/hours
```

**Resposta:**

```json
[
  { "id": 1, "name": "Professor Girafales", "totalHours": 20 },
  { "id": 2, "name": "Professor Linguiça", "totalHours": 15 }
]
```

---

### 2) Salas — Horários ocupados/livres

```http
GET /rooms/schedules
```

**Resposta:**

```json
[
  {
    "roomId": 1,
    "roomName": "Sala 101",
    "dayOfWeek": "Tue",
    "startTime": "08:00:00",
    "endTime": "10:00:00",
    "status": "Ocupada"
  },
  {
    "roomId": 2,
    "roomName": "Sala 201",
    "dayOfWeek": null,
    "startTime": null,
    "endTime": null,
    "status": "Livre"
  }
]
```

---

## 🧪 Rodando os Testes

```bash
npm run test
```

Exemplo de saída:

```
PASS  src/professors/infrastructure/professor.repository.impl.spec.ts
PASS  src/rooms/infrastructure/room.repository.impl.spec.ts
```

---

## Banco de Dados

### Schema principal (`scripts/schema.sql`)

Contém tabelas:

* `department`, `title`, `professor`
* `building`, `room`
* `subject`, `subject_prerequisite`
* `class`, `class_schedule`

### Dados de exemplo (`scripts/seed.sql`)

Inclui:

* Professores (Girafales, Linguiça, etc.)
* Salas (Sala 101, Sala 201)
* Disciplinas, Turmas e Horários

---

## Consultas SQL principais

### 1) Carga horária por professor

```sql
SELECT
    p.id,
    p.name,
    COALESCE(SUM(EXTRACT(EPOCH FROM (cs.end_time - cs.start_time)) / 3600), 0) AS total_hours
FROM professor p
LEFT JOIN subject s ON s.professor_id = p.id
LEFT JOIN class c ON c.subject_id = s.id
LEFT JOIN class_schedule cs ON cs.class_id = c.id
GROUP BY p.id, p.name
ORDER BY total_hours DESC;
```

### 2) Salas ocupadas e livres

```sql
SELECT
  r.id,
  r.name,
  cs.day_of_week,
  cs.start_time,
  cs.end_time,
  CASE WHEN cs.id IS NULL THEN 'Livre' ELSE 'Ocupada' END AS status
FROM room r
LEFT JOIN class_schedule cs ON cs.room_id = r.id
ORDER BY r.name, cs.day_of_week, cs.start_time;
```

---
