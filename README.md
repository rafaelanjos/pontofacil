# Ponto fácil 

----
## O que é o ponto facil?

Um modo simples e automático de registrar seu ponto.

A ideia foi de criar uma api node que registre as atividades.

Com auxilio do agendador de tarefas conseguimos executar um script python que faz a requisição para api, registrando o momento do login e logoff, e bloqueios do usuário.

----
## Como usar
1. Publique a api node.
2. Configure o scrip py para disparar a requisição contra a api, com os dados do usuário
3. Importe os xmls de tarefas conforme o usuário que deseja disparar o evento

----
## Changelog
* 06/12/2018 - Criando api e scripts para registro das atividades

----
## Roadmap
* Registrar um evento de almoço ao fazer bloqueio, e marcar os lançamentos registrados no intervalo como não calculados.
* Criar interface mobile para registrar atividades
* Criar interface web, para administrar os lançamentos
* Criar api para visualizar o total de horas pelo período filtrado.
 * Filtro padrão: do inicio ao fim do mês atual
 * Modo analítico: Demostra lista de todos os lançamentos calculados no período e o seu totalizador.
 * Modo sintético: Demonstra somente o total
* Api para calculo de total à receber pelo período informado. Considerando o modo analítico e sintético