<template>
  <div class="Topo">
    <img class="logo"  src="../assets/img/logo.png" /> 
  </div>
  <div class="hello">
    <h1 class="Titulo">Cadastro de Imoveis</h1>
    <h1>Selecione o Empreendimento</h1>

    <select  id="SelectEmpreendimento" v-model="empreendimentoSelecionado" @change="carregarEmpreendimento">
      <option v-for="empreendimento in empreendimentos" :key="empreendimento.id_empreendimento" :value="empreendimento">
        {{  empreendimento.nome }}
      </option>
    </select>

    <div id="Area_Mapa">
      <object
        class="img_mapa"
        v-if="empreendimentoDetalhes && Pegar_Imagem()"
        :data="Pegar_Imagem()"
        type="image/svg+xml"
        alt="Mapa SVG"
        ref="mapaContainer"
        @load="ClicarEmLote"
      ></object>
      <!-- Botões para zoom -->
      <!-- <div class="zoom-buttons" ref="zoomButtons">
        <button  class="btn_zoom" @click="Aumentar_Imagem">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>

        <button class="btn_zoom" @click="Diminuir_Imagem">
          <font-awesome-icon :icon="['fas', 'minus']" />
        </button>
      </div> -->
    </div>

    <div  class="Area_Info_Imoveis"  v-if="imoveis.length > 0" >

      <select id="filtroCodImovel" v-model="filtroCodImovel">
        <option value="">Todas as quadras</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="I">I</option>
        <option value="J">J</option>
        <option value="L">L</option>
        <option value="M">M</option>
        <option value="N">N</option>
        <option value="O">O</option>
        <option value="P">P</option>
      </select>
      

      <!-- <select  id="filtroSituacaoImovel" v-model="filtroSituacaoImovel">
        <option value="">Todas as situações</option>
        <option value="1">Vinculado</option>
        <option value="0">Não vinculado</option>
      </select> -->
  

      <h1>Informações dos Imoveis</h1>
      <table v-for="imovel in ImoveisFiltrados" :key="imovel.id_imovel">
        <tr>
          <th>Cod-Area</th>
          <th>ID imovel</th>
          <th>Cod-Imovel</th>
          <th>Situaçãos</th>
        </tr>
        <tr>
          <td>
            {{ imovel.cod_area }}
          </td>
          <td>
            {{ imovel.id_imovel }}
          </td>
          <td>  
            {{ imovel.cod_imovel }}
          </td>
          <td>
            {{ imovel.situacao === '1' ? 'Vinculado' : 'Não Vinculado' }}
          </td>
        </tr>
      </table>
    </div>
    <p v-else>Nenhum empreendimento selecionado...</p>
  </div>
  <FooterComponent />
</template>

<script>

import {api_empreendimento, api_imoveis}  from './services/api'
import FooterComponent from './Footer.vue'

export default {

  name:'Tela_Inicial',
  components:{
    FooterComponent
  },

  data(){
    return{
      empreendimentos: [],
      empreendimentoSelecionado: null,
      empreendimentoDetalhes: null,
      imoveis:[],
      filtroCodImovel: "",
      // filtroSituacaoImovel: "",
      svgContent: null,
    }
  },


  computed: {

    ImoveisFiltrados() {
      return this.imoveis.filter(imovel => {
        const filtroCodImovel = this.filtroCodImovel;
        // const filtroSituacaoImovel = this.filtroSituacaoImovel;
        // Aplica os filtros
        return (
          (filtroCodImovel === "" || imovel.cod_area === filtroCodImovel) 
          // (filtroSituacaoImovel === "" || imovel.situacao === filtroSituacaoImovel)
        );
      });
    },
  },

  mounted(){
    this.Pegar_Empreendimentos();
  },

  methods:{

    Pegar_Imagem(){
      if(this.empreendimentoDetalhes) {
        const idEmpreendimento = this.empreendimentoDetalhes.id_empreendimento;

        if (idEmpreendimento) {        
          let nomeArquivo = '';

          switch(idEmpreendimento) {

            case 32:
              nomeArquivo = 'mapasvg_32.svg';
              break;

            case 35:
              nomeArquivo = 'mapasvg_35.svg';
              break;  
              
            case 33:
              nomeArquivo = 'mapasvg_33.svg';
              break; 

            case 36:
              nomeArquivo = 'mapasvg_36.svg';
              break; 

            case 34:
              nomeArquivo = 'mapasvg_34.svg';
              break; 

            default:
              break;
              
          }

          if(nomeArquivo){
            const caminho = require(`../assets/img/${nomeArquivo}`);
            console.log(caminho);
            return caminho;
          }
        }
      }
      return null
    },


      Pegar_Empreendimentos(){
        api_empreendimento.get('/empreendimento')
          .then(response => {
            this.empreendimentos = response.data;
          })
          .catch(error => {
            console.error("Erro ao buscar os empreendimentos", error);
          })    
      },

      carregarEmpreendimento(){
        if(this.empreendimentoSelecionado){

          //Nessa consulta ele ira pegar o empreendimento especifico usando o id do empreendimento
          api_empreendimento.get(`/empreendimento/${this.empreendimentoSelecionado.id_empreendimento}`)
            .then(response => {
              this.empreendimentoDetalhes = response.data;

              //console.log(this.empreendimentoDetalhes)
              this.Carregar_Imoveis(this.empreendimentoDetalhes.cod_emp_imob);
            })
            .catch(error => {
              console.log('Erro ao carregar detalhes do empreendimento', error);
            });
        }
      },


      Carregar_Imoveis(codEmpImob){

        api_imoveis.get(`/imoveis/${codEmpImob}/0/0`)
        .then(response => {
          this.imoveis = response.data.Container.imoveis;
          //console.log(this.imoveis)
        })
        .catch(error => {
          console.error("Erro ao buscar os imoveis", error);
        })
      },


      Aumentar_Imagem(){
        this.nivel_zoon += 0.1;
        this.Atualizar_Zoom();
      },

      Diminuir_Imagem(){
        this.nivel_zoon -= 0.1;
        this.Atualizar_Zoom();
      },

      Atualizar_Zoom(){
        const imagem = document.getElementById('map');
        if(imagem){
          imagem.style.transform = `scale(${this.nivel_zoon})`;
        }
      },



      //Manipulação Inicial do Mapa
      // configurarCliqueLotes() {
      //   const svgElement = this.$refs.mapaSVG;

      //   if (svgElement) {
      //     svgElement.addEventListener('load', this.ConfigurarClique, { once: true });
      //   }
      // },

      // ConfigurarClique(){
      //   const svgElement = this.$refs.mapaSVG.contentDocument;
      //   svgElement.addEventListener('click', this.ClicarEmLote);
      // },


      ClicarEmLote() {
        const objElement = this.$refs.mapaContainer;

        if (objElement) {
          objElement.addEventListener('load', () => {
            const svgDocument = objElement.contentDocument;
            
            if (svgDocument) {
              svgDocument.addEventListener('click', (event) => {
                const clickedElement = event.target.closest('.alote rect');

                if (clickedElement) {
                  // Lógica para mudar a cor do lote clicado ou outras ações
                  clickedElement.style.fill = 'red';
                  console.log("Mudando de cor");
                }
              });
            }
          });
        }
      },




    }
  }


</script>


<style src="./estilo.scss"  lang="scss" />

